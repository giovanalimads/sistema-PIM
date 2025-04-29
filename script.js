function setTema(tema) {
    if (tema === 'escuro') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }