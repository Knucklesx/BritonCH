using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BretonBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace BretonBackend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        //CREATE => POST
        //READ => GET
        //UPDATE => PUT (Or PATCH => Partial Update)
        //DELETE => DELETE

        private static readonly List<Cliente> _clientes = [];

        //GET api/client
        [HttpGet]
        public ActionResult<IEnumerable<Cliente>> Get()
        {
            return Ok(_clientes);
        }

        //GET api/client/{id}
        [HttpGet("{id}")]
        public ActionResult<Cliente> Get(int id)
        {
            var cliente = _clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        //POST api/client
        [HttpPost]
        public ActionResult Post([FromBody] Cliente cliente)
        {
            _clientes.Add(cliente);
            return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
        }

        //PUT api/client/{id}
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Cliente cliente)
        {
            if (id != cliente.Id)
            {
                return BadRequest();
            }

            var clienteExistente = _clientes.FirstOrDefault(c => c.Id == id);

            if (clienteExistente == null)
            {
                return NotFound();
            }
            clienteExistente.Nome = cliente.Nome;

            return NoContent();
        }

        //DELETE api/client/{id}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var cliente = _clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null)
            {
                return NotFound();
            }
            _clientes.Remove(cliente);
            return NoContent();
        }
    }
}