<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    sleep(2);

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function delete(Request $request, Response $response, $args){
    sleep(2);

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $mysqli_connection->query("DELETE FROM alunni WHERE id = ". $args["id"]);
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function insert(Request $request, Response $response, $args){
    sleep(2);

    $params = json_decode($request->getBody()->getContents(), true);
    $nome = $params['nome'];
    $cognome = $params['cognome'];

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $query = "INSERT INTO alunni (nome, cognome) VALUES ('$nome', '$cognome')";
    $mysqli_connection->query($query);
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function modifica(Request $request, Response $response, $args){
    sleep(2);

    $params = json_decode($request->getBody()->getContents(), true);
    $nome = $params['nome'];
    $cognome = $params['cognome'];
    $id=$args['id'];

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $query = "UPDATE alunni SET nome='$nome', cognome='$cognome' WHERE id=$id";
    $mysqli_connection->query($query);
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }
}
