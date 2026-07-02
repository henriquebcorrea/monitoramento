
 
Centro Universitário
SENAI
Santa Catarina	AVALIAÇÃO PRÁTICA	Desempenho
	Data: 24/06/2026	
	Docente: Felipe Moura	
	Curso: Análise e Desenvolvimento de Sistemas	
	Unidade Curricular: Implantação de Sistemas	
	Turma: GR SADS 2024/1 N1	
	Estudante:	
Orientações gerais:
●	A atividade deverá ser desenvolvida individualmente.
●	Cada estudante deverá apresentar o projeto em sala de aula para o professor.
●	O projeto deverá estar funcional no momento da apresentação.
●	É permitido utilizar projetos já desenvolvidos durante a disciplina, desde que atendam aos requisitos descritos neste desafio.	

CAPACIDADES
1.	Reconhecer arquitetura do sistema computacional e aspectos do ambiente de implantação
2.	Reconhecer os tipos de plataformas referentes ao projeto de sistema de software
3.	Parametrizar o sistema,conforme plano de implantação do sistema
4.	Levantar recursos necessários para a implantação de software.

CONTEXTUALIZAÇÃO
✔ A implantação de sistemas é uma etapa fundamental do ciclo de desenvolvimento de software. Além de desenvolver aplicações funcionais, profissionais da área de tecnologia precisam garantir que os sistemas possam ser executados, monitorados e mantidos em ambientes produtivos.Nesse contexto, tecnologias como Docker, Grafana e Prometheus são amplamente utilizadas para automatizar implantações, monitorar recursos e acompanhar métricas de desempenho de aplicações. O domínio dessas ferramentas permite maior confiabilidade operacional, identificação rápida de falhas e melhor gestão dos recursos computacionais utilizados pelas aplicações.
 
DESAFIO
Comando
Cada estudante deverá desenvolver ou adaptar uma aplicação composta por:

●	Front-end funcional;
●	Back-end funcional;
●	Persistência de dados (Se necessário);
●	Monitoramento da aplicação por meio do Grafana e Prometheus ou solução equivalente.

Como sugestão, os estudantes poderão utilizar os projetos desenvolvidos durante as aulas envolvendo comunicação assíncrona com RabbitMQ. Entretanto, novos projetos poderão ser propostos, desde que atendam integralmente aos requisitos da atividade.

Etapa 1 – Desenvolvimento da Aplicação
A aplicação deverá possuir obrigatoriamente:

●	Interface gráfica (Front-end);
●	API ou serviço Back-end;
●	Banco de dados para armazenamento das informações;
●	Funcionalidade prática demonstrável durante a apresentação.

Exemplos:

●	Sistema de chamados;
●	Sistema de cadastro de usuários;
●	Sistema de gerenciamento de tarefas;
●	Aplicação baseada nos projetos de RabbitMQ desenvolvidos durante a disciplina.

Etapa 2 – Conteinerização
Todos os serviços da aplicação deverão ser executados utilizando Docker. Recomenda-se a utilização de:
●	Dockerfile;
●	Docker Compose;

Etapa 3 – Monitoramento
O ambiente deverá possuir monitoramento ativo utilizando:

●	Grafana e Prometheus;
●	Ou outra solução equivalente aprovada pelo professor.

Requisitos mínimos de monitoramento
●	1 dashboard funcional

Requisito obrigatório
O Grafana, Prometheus (ou ferramenta equivalente) deverá estar executando em containers Docker.
 
RESULTADOS E ENTREGAS
Código-fonte do projeto
Contendo:

●	Front-end;
●	Back-end;
●	Banco de dados;
●	Arquivos Dockerfile;
●	Arquivos Docker Compose (quando utilizados).
●	Readme;

Envio do link do repositório via AVA até 24/06/2026.

Apresentação Prática
Demonstração completa do funcionamento da aplicação e do ambiente monitorado.


CRITÉRIOS AVALIATIVOS
IMPLANTAÇÃO E MONITORAMENTO DE APLICAÇÕES CONTEINERIZADAS
Descrição da Atividade	Atende	Atende Parcialmente	Não Atende
Funcionamento do Front-end			
Funcionamento do Back-end			
Aplicação dos conceitos de levantamento de requisitos			
Conteinerização da aplicação			
Configuração do Docker Compose e infraestrutura			
Demonstração das métricas no Grafana/Prometheus			
Clareza e qualidade da apresentação oral			

