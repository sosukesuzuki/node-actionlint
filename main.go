package main

import "syscall/js"

// import (
// 	"io/ioutil"
// 	"syscall/js"

// 	"github.com/rhysd/actionlint"
// )

// var global = js.Global().Get("global")

// func encodeErrorAsMap(err *actionlint.Error) map[string]interface{} {
// 	obj := make(map[string]interface{}, 4)
// 	obj["message"] = err.Message
// 	obj["line"] = err.Line
// 	obj["column"] = err.Column
// 	obj["kind"] = err.Kind
// 	return obj
// }

// func fail(err error, when string) {
// 	global.Call("throwError", err.Error()+" on "+when)
// }

// func lint(source string, filePath string) interface{} {
// 	opts := actionlint.LinterOptions{}
// 	linter, err := actionlint.NewLinter(ioutil.Discard, &opts)
// 	if err != nil {
// 		fail(err, "creating linter instance")
// 		return nil
// 	}
// 	errs, err := linter.Lint(filePath, []byte(source), nil)
// 	if err != nil {
// 		fail(err, "applying lint rules")
// 		return nil
// 	}

// 	return errs
// }

// func runActionlint(_this js.Value, args []js.Value) interface{} {
// 	source := args[0].String()
// 	filePath := args[1].String()
// 	return lint(source, filePath)
// }

func runActionlint(_thi js.Value, args []js.Value) interface{} {
  return 3
}

func main() {
	js.Global().Set("runActionlint", js.FuncOf(runActionlint))
	select {}
}
