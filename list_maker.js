import { createInterface } from "readline";
import {
  existsSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Create a readline interface to prompt the user
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for the desired action
rl.question(
  "What would you like to do? (create, remove, or delete) ",
  (action) => {
    if (action === "create") {
      createList();
    } else if (action === "remove") {
      removeList();
    } else if (action === "delete") {
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
  rl.question("What type of list would you like to create? ", (listType) => {
    console.log(`Creating a ${listType} list...`);

    // Check if a file with the same name already exists
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${listType}-${date}.json`;
    if (existsSync(fileName)) {
      console.log(`Found an existing ${listType} list. Appending to it...`);
      const data = readFileSync(fileName);
      const existingItems = JSON.parse(data);
      items.push(...existingItems);
    }

    // Prompt the user to add items to the list
    function promptUser() {
      rl.question("Enter an item (press Ctrl+C to exit): ", (item) => {
        if (item === "close") {
          // If the user presses Ctrl+C, exit the program

          saveList(fileName, items);
          console.log("List saved to file.");

          rl.close();
        } else {
          // Otherwise, add the item to the array and prompt the user again
          items.push(item);
          promptUser();
        }
      });
    }

    // Start the program by prompting the user for list items
    promptUser();
  });
}

// Remove a specific list by name
function removeList() {
  // Prompt the user for the list type
  rl.question("What type of list would you like to remove? ", (listType) => {
    // Find the file(s) with the specified name
    const files = readdirSync(".").filter((file) => {
      return file.startsWith(`${listType}-`) && file.endsWith(".json");
    });

    if (files.length === 0) {
      console.log(`No ${listType} lists found.`);
      rl.close();
    } else if (files.length === 1) {
      // If there is only one file with the specified name, remove it
      unlinkSync(files[0]);
      console.log(`Removed ${files[0]}.`);
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
          unlinkSync(files[index]);
          console.log(`Removed ${files[index]}.`);
        }
        rl.close();
      });
    }
  });
}

// Delete all lists
function deleteLists() {
  // Prompt the user for confirmation
  rl.question("Are you sure you want to delete all lists? (y/n) ", (answer) => {
    if (answer === "y") {
      // Find all JSON files in the current directory and delete them
      const files = readdirSync(".").filter((file) => {
        return file.endsWith(".json");
      });
      files.forEach((file) => {
        unlinkSync(file);
        console.log(`Removed ${file}.`);
      });
    }
    rl.close();
  });
}

// Save a list to a file in JSON format
function saveList(fileName, items) {
  const data = JSON.stringify(items, null, 2);
  const currentFilePath = fileURLToPath(import.meta.url);
  const directoryPath = path.dirname(currentFilePath);
const filePath = path.join("./datbase/lists/", fileName);
console.log(filePath)
  writeFileSync(
    filePath,
    data,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
