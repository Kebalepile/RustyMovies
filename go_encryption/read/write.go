package read

import (
	"fmt"
	"os"
	"strings"
)

func WriteJavaScript(cipherText []string) {
	// Convert each string in the slice to a quoted string
	quotedStrings := make([]string, len(cipherText))
	for i, str := range cipherText {
		quotedStrings[i] = fmt.Sprintf("\"%s\"", str)
	}

	// Join the quoted strings into a single string
	joinedStrings := strings.Join(quotedStrings, ", ")

	code := fmt.Sprintf("export default function links() {\n\treturn [%s];\n}", joinedStrings)

	err := os.WriteFile("cipherText.js", []byte(code), 0644)
	if err != nil {
		panic(err)
	}

	fmt.Println("'cipherText.js' file created")
}
