# BritonChallenge

## Description
Este projeto usa Angular e .net. A ideia do projeto é criar um sistema de gerenciamento de clientes. 
Há uma página de login para acessar o sistema. O usuário deve fornecer um e-mail e uma senha.
As páginas internas são protegidas, então não são passíveis de acesso sem o login.
A primeira página traz a lista dos clientes cadastrados. O usuário pode adicionar um novo cliente ou editar um cliente. 
O formulário da página de edição tem alguns valores que são impossíveis de alterar, nome, cpf e data de nascimento. Os demais campos são passíveis de alteração.
Na mesma página de edição, o usuário pode excluir o cliente.
Há ainda uma página de criar um novo usuário. O novo usuário deve fornecer nome, um e-mail e uma senha. O e-mail deve ser único.
Há também uma página de adição de novos clientes. O usuário deve fornecer nome, cpf, data de nascimento, e-mail, telefone e endereço. O cpf deve ser único.

## Tecnologias
- Angular
- .net
- Sql Server

## Como rodar o projeto
1. Clone o repositório
2. Abra o projeto no Visual Studio
3. Abra o terminal na pasta do backend
4. É necessário criar um arquivo .env na pasta do backend com a string de conexão com o banco de dados. Exemplo: `ConnectionStrings__DefaultConnection=Server=localhost;Database=BritonChallenge;User Id=sa;Password=senha`
5. Rode os comandos `docker compose up`, `dotnet ef database update` e `dotnet run`, nesta ordem.
6. Abra o terminal na pasta do frontend
7. Rode o comando `npm install`
8. Rode o comando `ng serve`
9. Abra o navegador e acesse `http://localhost:4200/`

## Autor
- [Gustavo Facchinetti](https://www.linkedin.com/in/gustavo-facchinetti/)

```



