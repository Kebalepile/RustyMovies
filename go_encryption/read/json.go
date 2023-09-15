package read

import (
	e "go_encrypt/encrypt"

	"encoding/json"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func FindFiles() (map[string][]string, error) {

	json_files := map[string][]string{
		"searched_movie": {},
		"trending_movie": {},
	}

	files_dir := "database"
	err := filepath.Walk(files_dir, func(file_path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && filepath.Ext(file_path) == ".json" {

			if strings.Contains(info.Name(), "searched_movie") {
				must_watch := json_files["searched_movie"]
				json_files["searched_movie"] = append(must_watch, file_path)

			} else if strings.Contains(info.Name(), "trending_movie") {

				trending_movie := json_files["trending_movie"]

				json_files["trending_movie"] = append(trending_movie, file_path)

			}

		}

		return nil

	})

	if err != nil {
		return nil, err
	}

	return json_files, nil

}

func ReadFileContents(filename string) ([]byte, error) {
	contents, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	return contents, nil
}

/*
*@description Get file names of *.json files
*@return slice of *.json file names
 */
func GetFiles(key string) ([]string, error) {
	json_files, err := FindFiles()
	if err != nil {
		log.Println("Error while  searching for *.json files -> ", err)
		return nil, err
	}

	if value, exists := json_files[key]; exists && value != nil {
		return value, nil
	} else {
		return nil, nil
	}
}

func ReadAndPrintJSONFiles() {
	json_files, err := FindFiles()
	if err != nil {
		log.Println("Error while  searching for *.json files -> ", err)
		return
	}
	fileContentChan := make(chan []byte)
	for _, files := range json_files {

		for _, file := range files {
			go func(filename string) {
				contents, err := ReadFileContents(filename)
				if err != nil {
					log.Println("Error while trying to read " + filename + " file contents")
					log.Println(err)
					return
				}
				fileContentChan <- contents
			}(file)
		}

	}
	// Recevie the contents from the channel and print it to the cmd
	for k, files := range json_files {
		log.Println("Reading " + k + " files.")
		for range files {
			contents := <-fileContentChan
			log.Println(string(contents))
		}

	}

}
func EncryptEncodeFiles() {
	json_files, err := FindFiles()
	if err != nil {
		log.Println("Error while  searching for *.json files -> ", err)
		return
	}

	var cipherText []string
	for _, files := range json_files {

		for _, file := range files {
			
				contents, err := ReadFileContents(file)
				if err != nil {
					log.Println("Error while trying to read " + file + " file contents")
					log.Println(err)
					return
				}
				var movies e.Movies
				err = json.Unmarshal(contents, &movies)
				if err != nil {
					log.Fatal(err)
				}
				
				encrypted, err := e.EncryptEncode(movies)
				if err != nil {
					panic(err)
				}
				log.Println("Reading, ", file)
				cipherText = append(cipherText, encrypted)
				WriteJavaScript("./js/"+file[9:], cipherText)
				log.Println(("--------------skip------------"))
			
		}

	}

}
