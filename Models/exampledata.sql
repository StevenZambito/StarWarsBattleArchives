TRUNCATE TABLE "Battles", "Comments", "Users" RESTART IDENTITY;

INSERT INTO "Battles" ("Name", "Conflict", "Era", "Date", "Location", "Combatants1", "Combatants2", "Outcome", "Description") VALUES ('Battle of Hoth', 'Galactic Civil War', 'Age of Rebellion', '3 ABY', 'Hoth', '{Jedi Order, Something Else}', '{Empire}', 'Rebels successfully evacuate', 'The Battle of Hoth, also known as the attack on Hoth, the assault on Echo Base, or the attack on Echo Base, was a major battle fought in 3 ABY and was considered a major victory for the Galactic Empire and the single worst battlefield defeat suffered by the Rebel Alliance during the Galactic Civil War.');

INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Sarah', 'sarah@suncoast.io', 'xxxxx');

INSERT INTO "Comments" ("BattleId", "CreatedAt", "Body", "UserId") VALUES (1, '2020-01-01 14:23:55', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 1);
INSERT INTO "Comments" ("BattleId", "CreatedAt", "Body", "UserId") VALUES (1, '2020-01-01 18:23:55', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 1);
