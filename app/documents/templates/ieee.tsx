export const IEEE = `
\\documentclass[conference]{IEEEtran}
\\usepackage[T1]{fontenc}
\\usepackage{graphicx, amsmath, amssymb, hyperref}
\\usepackage{listings, xcolor}
\\usepackage{float}

% Define colors
\\definecolor{myorange}{RGB}{131,59,12}

% Listings settings
\\lstset{
  backgroundcolor=\\color{white},
  basicstyle=\\ttfamily\\color{black},
  escapeinside={||},
  breaklines=true,
  lineskip=2pt,
}

\\title{Your IEEE Paper Title}
\\author{Author Name \\\\ Institution \\\\ Email}
\\date{}

\\begin{document}
\\maketitle
`