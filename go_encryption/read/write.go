package read

import (
	"fmt"
	"os"
	"strings"
)

func WriteJavaScript(name string, cipherText []string) {
	// Convert each string in the slice to a quoted string
	quotedStrings := make([]string, len(cipherText))
	for i, str := range cipherText {
		quotedStrings[i] = fmt.Sprintf("\"%s\"", str)
	}

	// Join the quoted strings into a single string
	joinedStrings := strings.Join(quotedStrings, ", ")

	code := fmt.Sprintf("export function links() {\n\treturn [%s];\n}", joinedStrings)
	fileName := strings.ReplaceAll(name+"Cipher.js", " ", "")
	err := os.WriteFile(fileName, []byte(code), 0644)
	if err != nil {
		panic(err)
	}

	fmt.Println(fileName, " file created")
}
