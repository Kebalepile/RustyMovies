package pipeline

import (
	"backend/types"
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
)

// create file of given fileType, add data to latter and save file.
func createFile(fileType, fileName, folder string, data *types.Categories) error {

	buffer := &bytes.Buffer{}

	if fileType == "js" {
		buffer.WriteString("export const data = ")
	}

	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	encoder.SetIndent("", "  ")

	err := encoder.Encode(*data)
	if err != nil {
		return err
	}

	filePath := filepath.Join("database", folder, fmt.Sprintf("%s.%s", fileName, fileType))

	err = os.WriteFile(filePath, buffer.Bytes(), 0644)
	if err != nil {
		return err
	}

	log.Println(fileName, " Saved at ", filePath)

	return nil

}

// create file wrapper, saves file to a *.json file
func ToJson(fileName, folder string, data *types.Categories) error {

	err := createFile("json", fileName, folder, data)
	if err != nil {
		return err
	}

	return nil

}

// create file wrapper, saves file to a *.js file
func ToJavaScript(fileName, folder string, data *types.Categories) error {

	err := createFile("js", fileName, folder, data)
	if err != nil {
		return err
	}

	return nil
}
