install:
	@ echo "> Installing..."
	@ brew cask install pandoc
	@ brew cask install mactex

run:
	@ echo "> Run, lil thing, run!"
	@ pandoc data/index.md --template=./src/template.html -r markdown -o dist/index.html
