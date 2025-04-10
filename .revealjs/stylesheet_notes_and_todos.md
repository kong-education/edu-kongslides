# Stylesheet

## Slides
 - Bold (**text**) appears are red text
 - Can the slide notes text have smaller font
 - Single `backticks` just appear in red and note monospaced format

## Workbooks & PDF
- The PDF & Workbook have Zenika in the name - 'Zenika-KGLL-202-Slides.pdf' & 'Zenika-KGLL-202-Workbook.pdf'
    - https://github.com/kong-education/edu-kongslides/blob/kong-styles/src/cli/cli.js#L115
    - https://github.com/kong-education/edu-kongslides/blob/kong-styles/src/cli/cli.js#L147
- Update links on `index.html` - getting this 404 error `Cannot GET /pdf/Zenika-KGLL-202-Workbook.pdf`
    - source `src/app/index.html`
- Can we have similar `bash` formatting in the workbook

# Other
- Create a new "edu-ilt-material" repo and push slides, slide PDFs, and workbooks
    - So instructors can clode this repo separately wth all training material
- Would need a "quickfix" procedure and instructions for  instructors
- Setup GitHub Actions to auto generatae slide
    - Pushes to repo, and s3 (or GitHib repo)
    - Must be able to run this ad hoc
- For the workbook, need some javascript for a clickable icon to copy the contents of a ```bash``` text box to the clipboard
- Can we have a ```bash-command``` and ```bash```

