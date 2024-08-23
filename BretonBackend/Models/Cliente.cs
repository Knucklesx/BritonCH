using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BretonBackend.Models
{
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Nome { get; set; }

        [Required]
        public required string Cpf { get; set; }

        [Required]
        public required string Data_de_Nascimento { get; set; }

        [Required]
        public required string Telefone { get; set; }

        [Required]
        public required string Cep { get; set; }

        [Required]
        public required string Logradouro { get; set; }
        public required string Numero { get; set; }
        public required string Complemento { get; set; }
        [Required]
        public required string Bairro { get; set; }
        [Required]
        public required string Cidade { get; set; }
        [Required]
        public required string Estado { get; set; }

    }
}