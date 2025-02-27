export const collegeTemplate = `
\\documentclass[oneside]{book}
\\usepackage[T1]{fontenc}
\\usepackage[demo]{graphicx}
\\usepackage{grffile}
\\usepackage{tocloft}
\\usepackage{mathptmx}
\\usepackage[a4paper, total={6in, 8in}]{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{color}
\\usepackage{tabularx}
\\usepackage{listings}
\\usepackage{subcaption}
\\definecolor{myorange}{RGB}{131,59, 12}
\\usepackage{titlesec}

\\titleformat{\\chapter}[display]
{\\normalfont\\fontsize{16}{22}\\selectfont\\bfseries}
  {\\MakeUppercase{\\chaptertitlename} \\thechapter}
{10pt}
{\\centering\\fontsize{18}{22}\\selectfont}
\\titlespacing*{\\chapter}{0pt}{-20pt}{20pt}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\normalsize}{\\fontsize{12}{14}\\selectfont}
\\DeclareUnicodeCharacter{2212}{\\ensuremath{-}}\\newcommand{\\osquare}{[}
\\newcommand{\\csquare}{]}
\\newcommand{\\oround}{(}
\\newcommand{\\cround}{)}
\\newcommand{\\ocurly}{\\text{\\{}}
\\newcommand{\\ccurly}{\\text{\\}}}
\\newcommand{\\quotes}{"}
\\newcommand{\\codelst}[1]{\\lstinline{#1}}
  \\fancyhead[L]{\\color{black}\\fontsize{12}{20}\\selectfont\\bfseries\\textbf{ReportJi}}
\\fancyhead[R]{\\color{black}\\textbf{\\leftmark}}
\\fancyfoot[L]{\\color{black} \\fontsize{12}{20}\\selectfont\\textbf{Department of Computer Science}}
  \\fancyfoot[R]{\\color{black}\\fontsize{12}{20}\\selectfont Page \\thepage}
\\renewcommand{\\headrule}{\\color{myorange}\\hrule height 0.4pt}
\\renewcommand{\\footrule}{\\color{myorange}\\hrule height 0.4pt}
\\fancypagestyle{plain}{
  \\fancyhf{}
  \\fancyhead[L]{\\color{black}\\fontsize{12}{20}\\selectfont\\bfseries\\textbf{ReportJi}}
  \\fancyhead[R]{\\color{black}\\textbf{\\leftmark}}
  \\fancyfoot[L]{\\color{black} \\fontsize{12}{20}\\selectfont\\textbf{Department of Computer Science}}
  \\fancyfoot[R]{\\fontsize{12}{20}\\selectfont \\color{black}Page \\thepage}
  \\renewcommand{\\headrule}{\\color{myorange}\\hrule height 0.4pt}
  \\renewcommand{\\footrule}{\\color{myorange}\\hrule height 0.4pt}
}
\\linespread{1.5}
\\usepackage{float}
\\restylefloat{figure}
\\lstset{
  backgroundcolor=\\color{white},
  basicstyle=\\ttfamily\\color{black},
  escapeinside={||},
  breaklines=true,
  lineskip=2pt,
}
\\begin{document}
\\setcounter{page}{0}
\\tableofcontents
\\newpage\\listoffigures
\\clearpage
\\pagenumbering{arabic}
\\setcounter{page}{1}

`