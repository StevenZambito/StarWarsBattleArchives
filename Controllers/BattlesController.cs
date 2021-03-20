using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// using Geocoding.Microsoft;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StarWarsBattleArchives.Models;

namespace StarWarsBattleArchives.Controllers
{
    // All of these routes will be at the base URL:     /api/Battles
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case BattlesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class BattlesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public BattlesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Battles
        //
        // Returns a list of all your Battles
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Battle>>> GetBattles(string filter)
        {
            if(filter == null) {
            // Uses the database context in `_context` to request all of the Battles, sort
            // them by row id and return them as a JSON array.
                return await _context.Battles.OrderBy(row => row.Id).Include(battle => battle.Comments).ToListAsync();
            } else {
                return await _context.Battles.Where(battle => battle.Name.ToLower().Contains(filter.ToLower())).OrderBy(row => row.Id).Include(battle => battle.Comments).ToListAsync();
            }
            
            
        }

        // GET: api/Battles/5
        //
        // Fetches and returns a specific battle by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Battle>> GetBattle(int id)
        {
            var battle = await _context.Battles.
            Include(battle => battle.Comments).
            ThenInclude(comment => comment.User).
            Where(battle => battle.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (battle == null)
            {
                // Return a `404` response to the client indicating we could not find a battle with this id
                return NotFound();
            }

            //  Return the battle as a JSON object.
            return battle;
        }

        // PUT: api/Battles/5
        //
        // Update an individual battle with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Battle
        // variable named battle. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Battle POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutBattle(int id, Battle battle)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != battle.Id)
            {
                return BadRequest();
            }
            // Find this restaurant by looking for the specific id
            var battleBelongsToUser = await _context.Battles.AnyAsync(battle => battle.Id == id && battle.UserId == GetCurrentUserId());
            if (!battleBelongsToUser)
            {
                // Make a custom error response
                var response = new
                {
                    status = 401,
                    errors = new List<string>() { "Not Authorized" }
                };

                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Tell the database to consider everything in battle to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from battle
            _context.Entry(battle).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!BattleExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(battle);
        }

        // POST: api/Battles
        //
        // Creates a new battle in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Battle
        // variable named battle. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Battle POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Battle>> PostBattle(Battle battle)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            battle.UserId = GetCurrentUserId();
            // Indicate to the database context we want to add this new record
            _context.Battles.Add(battle);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetBattle", new { id = battle.Id }, battle);
        }

        // DELETE: api/Battles/5
        //
        // Deletes an individual battle with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteBattle(int id)
        {
            // Find this battle by looking for the specific id
            var battle = await _context.Battles.FindAsync(id);
            if (battle == null)
            {
                // There wasn't a battle with that id so return a `404` not found
                return NotFound();
            }

            if (battle.UserId != GetCurrentUserId())
            {
               // Make a custom error response
            var response = new
              {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
              };

                // Return our error with the custom response
                return Unauthorized(response);
            }

            // Tell the database we want to remove this record
            _context.Battles.Remove(battle);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(battle);
        }

        // Private helper method that looks up an existing battle by the supplied id
        private bool BattleExists(int id)
        {
            return _context.Battles.Any(battle => battle.Id == id);
        }

        // Private helper method to get the JWT claim related to the user ID
        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }

    }
}
