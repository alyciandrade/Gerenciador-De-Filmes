
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineListAPI.Models
{
    [Table("Filmes")]
    public class Filme
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]  
        public required string Nome { get; set; }
        public int Nota { get; set; }
    }
}
