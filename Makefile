build: main.wasm

install: wasm_exec.js

wasm_exec.js:
	cp $$(go env GOROOT)/misc/wasm/wasm_exec.js .

main.wasm: main.go
	GOOS=js GOARCH=wasm go build -o main.wasm

.PHONY: build install
