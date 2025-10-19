jQuery(document).ready(function($) {
      var cepId = '#cep';
      var enderecoId = '#endereco';
      var bairroId = '#bairro';

      function setLoading(loading) {
        var loadingText = 'Carregando...';
        if (loading) {
          $(enderecoId).val(loadingText);
          $(bairroId).val(loadingText);
        } else {
          $(enderecoId).val('');
          $(bairroId).val('');
        }
      }

      $(cepId).on('blur', function() {
        let cep = $(this).val().replace(/\D/g, '');
        if (cep !== "") {
          let validacep = /^[0-9]{8}$/;
          if (validacep.test(cep)) {
            setLoading(true);
            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/", function(dados) {
              setLoading(false);
              if (!("erro" in dados)) {
                $(enderecoId).val(dados.logradouro);
                $(bairroId).val(dados.bairro);
              } else {
                alert("CEP não encontrado.");
              }
            });
          } else {
            alert("Formato de CEP inválido.");
          }
        }
      });
    });