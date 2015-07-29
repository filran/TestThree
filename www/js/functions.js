//listar as campanhas na primeira tela
function lista_campanhas(){
	loading_on();

	$.getJSON( URL_SOA_LISTA_CAMPANHAS , {format:"json"} )
		.fail(function( jqxhr, textStatus, error ) {
			loading_off();

 
		})
		.done(function(data){
			loading_off();

			if( data == "" ){
				$("#tbody-campanhas").append("<tr><td><p align='center'>Não há campanhas :(</p></td></tr>");
			}
			else
			{
				c = 1;
				qtd = data.length;
				count = 1;
				$.each(data,function(k,v){

					//daqui em diante lista as camapanhas, ajustando a disposição das imgs independente da qtd (ímpar ou par)
					// por isso que ficou grande assim
					img = "<td><a href='#prod-camp-page' class='img-campanha' idcampanha='"+v.id+"'><img src='"+v.img+"'></td>";

					if( qtd == 1 )
					{
						$("#tbody-campanhas").append("<tr>"+img+"</tr>");				
					}
					else if( count < qtd )
					{
						if( c == 1 )
						{
							c++;
							$("#tbody-campanhas").append("<tr>"+img);
						}
						else if( c ==2 )
						{
							c=1;
							$("#tbody-campanhas").children().last().append(img+"</tr>");
						}
						count++;
					}
					else if (count == qtd)
					{
						if( qtd % 2 == 0  )
						{
							$("#tbody-campanhas").children().last().append(img+"</tr>");
						}
						else
						{
							$("#tbody-campanhas").append("<tr>"+img+"</tr>");
						}
						
					}
				});		
			}
		})
	;
}


function lista_produtos_campanha(id_campanha){
	loading_on();
	zera = $("#tbody-prod-camp").html("");

	$.getJSON( URL_SOA_LISTA_PRODUTOS_CAMPANHA+"?id_campanha="+id_campanha , {format:"json"} )
		.fail(function( jqxhr, textStatus, error ) {
			loading_off();

   			alert( msg_erro_padrao_soa() );
		})
		.done(function(data){
			loading_off();

			if( data == "" ){
				zera;
				$("#tbody-prod-camp").append("<tr><td qtd-prod='0'><p align='center'>Ops :( Estranho que esta campanha não tenha produtos. Volte mais tarde, meu amigo :)</p></td></tr>");
			}
			else
			{
				zera;
				c = 1;
				qtd = data.length;
				count = 1;
				$.each(data,function(k,v){	
					//daqui em diante lista as camapanhas, ajustando a disposição das imgs independente da qtd (ímpar ou par)
					// por isso que ficou grande assim
					resp = '<td id-produto="'+v.id+'"><div id="img"><div id="desconto"><div id="valor-desconto">'+v.desconto+'</div></div><img src="'+v.img+'" /></div><div id="marca">'+v.marca+'</div><div id="produto">'+v.produto+'</div><div id="preco_antigo">'+v.preco_antigo+'</div><div id="preco_atual">'+v.preco_atual+'</div></td>';	

					if( qtd == 1 )
					{
						$("#tbody-prod-camp").append("<tr>"+resp+"</tr>");				
					}
					else if( count < qtd )
					{
						if( c == 1 )
						{
							c++;
							$("#tbody-prod-camp").append("<tr>"+resp);
						}
						else if( c ==2 )
						{
							c=1;
							$("#tbody-prod-camp").children().last().append(resp+"</tr>");
						}
						count++;
					}
					else if (count == qtd)
					{
						if( qtd % 2 == 0  )
						{
							$("#tbody-prod-camp").children().last().append(resp+"</tr>");
						}
						else
						{
							$("#tbody-prod-camp").append("<tr>"+resp+"</tr>");
						}
					}
				});		
			}
		})
	;
}


function lista_produto(id_produto)
{
	loading_on();

	$.getJSON( URL_SOA_LISTA_PRODUTO+"?id_produto="+id_produto , {format:"json"} )
		.fail(function( jqxhr, textStatus, error ) {
			loading_off();

   			alert( msg_erro_padrao_soa() );
		})
		.done(function(data){
			loading_off();

			if( data == "" ){
				$("#prod-main").html("<p align='center'>Ops :( Não achamos esse produto. Volte mais tarde!</p>");
			}
			else
			{
				$.each(data,function(k,v){
					for( i=1 ; i<=v.imgs.length ; i++ )
					{
						$(".swiper-wrapper").append('<div class="swiper-slide"><img src="'+v.imgs[i]+'"></div>');
					}
					$("#nome-prod").html(v.marca+" - "+v.produto);
					$("#preco").html(v.preco);
					$("#parcelamento").html(" até "+v.parcelamento);
					$("#detalhes").html(v.detalhes);
				});		
			}
		})
	;	
}


//mensagem de erro padrão quando chama SAO
function msg_erro_padrao_soa()
{
	return "Puts! Algo deu errado. Volta daqui a pouco que resolve :)";
}

//mostra algo quando está carregando algum serviço
function loading_on(){
	$.mobile.loading( 'show' );
}

//oculta algo quando terminar de carregar o serviço
function loading_off(){
	$.mobile.loading( 'hide' );
};