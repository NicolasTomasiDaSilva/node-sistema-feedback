Estou fazendo sistema de feedback, ele ira servir varios segmentos onde tera 3 tipos de acesso manager, supervisor e employee, manager e supervisor podem criar templates de feedback, e selecionar um deles na hora de aplicar, managers e supervisores podem aplicar feedback a qualquer usuario da empresa, e employes podem apenas visualizar feedbacks dados a eles.

Estou seguindo boas praticas e clean arch

## Funcionalidades

### Busca de Feedbacks por Nome do Receiver

Agora é possível buscar feedbacks pelo nome do receiver usando o parâmetro `receiverName` na query string:

```
GET /feedbacks?receiverName=Nic
```

Esta busca retornará todos os feedbacks onde o receiver tem um nome que começa com "Nic" (case insensitive), como:

- Nicolas
- Nicole
- Nicholas
- etc.

**Parâmetros disponíveis:**

- `page`: Número da página (padrão: 1)
- `perPage`: Itens por página (padrão: 5, máximo: 50)
- `receiverName`: Nome do receiver para busca (opcional)

**Exemplos de uso:**

```
GET /feedbacks?receiverName=João&page=1&perPage=10
GET /feedbacks?receiverName=Maria
GET /feedbacks?page=2&perPage=20
```
