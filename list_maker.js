import { createInterface } from "readline";
import { unlink, writeFileSync, readdir, readFile } from "fs";
import path from "path";

const folderPath = "database/lists";

// Create a readline interface to prompt the user
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for the desired action
rl.question(
  `What would you like to do? 
     enter 1 for create
     enter 2 for remove
     enter 3 for delete 
     :
     `,
  (action = action.trim()) => {
    if (action === "1") {
      createList();
    } else if (action === "2") {
      removeList();
    } else if (action === "3") {
      deleteLists();
    } else {
      console.log(`Invalid action: ${action}`);
      rl.close();
    }
  }
);

// Create a new list
function createList() {
  // Create an empty array to store the list items

  const items = [];
  // Prompt the user for the list type
  rl.question(
    `What type of list would you like to create? 
      enter 1 for movies
      enter 2 for series
      :
  `,
    (listType) => {
      console.log(`Creating a ${listType} list...`);
      listType = listType.trim();
      if (listType === "1") {
        listType = "movies";
      } else if (listType === "2") {
        listType = "series";
      }
      // Check if a file with the same name already exists
      const date = new Date().toISOString().slice(0, 10);
      const fileName = `${listType}-${date}.json`;

      readdir(folderPath, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach((name) => {
          if (name === fileName) {
            //   console.log(`Found an existing ${listType} list. Appending to it...`);
            readFile(path.join(folderPath, name), (err, data) => {
              if (err) throw err;
              const existingItems = JSON.parse(data);
              items.push(...existingItems);
            });
          }
        });
      });

      // Prompt the user to add items to the list
      function promptUser() {
        rl.question(
          "Enter an item (type 'done' to close program): ",
          (item) => {
            if (item === "done") {
              // If the user presses Ctrl+C, exit the program
              items.length && saveList(fileName, items);
              console.log("program shutdown");

              rl.close();
            } else {
              // Otherwise, add the item to the array and prompt the user again
              items.push(item);
              promptUser();
            }
          }
        );
      }

      // Start the program by prompting the user for list items
      promptUser();
    }
  );
}

// Remove a specific list by name
function removeList() {
  // Prompt the user for the list type
  rl.question("What type of list would you like to remove? ", (listType) => {
    readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.filter((file) => {
        if (file.startsWith(`${listType}-`) && file.endsWith(".json")) {
          return file;
        }
      });
      if (files.length === 0) {
        console.log(`No ${listType} lists found.`);
        rl.close();
      } else if (files.length === 1) {
        // If there is only one file with the specified name, remove it

        unlink(path.join(folderPath, files[0]), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Removed ${files[0]}.`);
        });

        rl.close();
      } else {
        // If there are multiple files with the specified name, prompt the user to choose one
        console.log(`Found ${files.length} ${listType} lists:`);
        for (let i = 0; i < files.length; i++) {
          console.log(`${i + 1}. ${files[i]}`);
        }
        rl.question("Which one would you like to remove? ", (choice) => {
          const index = parseInt(choice) - 1;
          if (isNaN(index) || index < 0 || index >= files.length) {
            console.log(`Invalid choice: ${choice}`);
          } else {
            unlink(path.join(folderPath, files[index]), (err) => {
              if (err) {
                console.error(err);
                return;
              }

              console.log(`Removed ${files[index]}.`);
            });
          }
          rl.close();
        });
      }
    });
  });
}

// Delete all lists
function deleteLists() {
  // Prompt the user for confirmation
  rl.question("Are you sure you want to delete all lists? (y/n) ", (answer) => {
    if (answer === "y") {
      // Find all JSON files in the current directory and delete them
      readdir("./database/lists", (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files
          .filter((file) => file.endsWith(".json"))
          .forEach((file) =>
            unlink(path.join(folderPath, file), (err) => {
              if (err) {
                console.error(err);
                return;
              }

              console.log(`Removed ${file}.`);
            })
          );
      });
    }
    rl.close();
  });
}

// Save a list to a file in JSON format
function saveList(fileName, items) {
  const data = JSON.stringify(items, null, 2);

  const filePath = path.join("./database/lists/", fileName);
  console.log(filePath);
  writeFileSync(filePath, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}