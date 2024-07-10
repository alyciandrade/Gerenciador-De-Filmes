using CineListAPI.Context;
using CineListAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CineListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmesController : ControllerBase
    {
        private readonly FilmeDbContext _context;

        public FilmesController(FilmeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Filme> GetFilmes()
        {
            return _context.Filmes.ToList();
        }

        [HttpGet("{id}")]
        public Filme GetFilmeById(int id)
        {
            return _context.Filmes.SingleOrDefault ( e => e.Id == id);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = _context.Filmes.SingleOrDefault (x => x.Id == id);

            if (movie == null)
            {
                return NotFound("Filme com id "+id+" não existe");
            }
            _context.Filmes.Remove(movie);
            _context.SaveChanges();

            return Ok("Filme com o id " + id + " deletado com sucesso!");
        }

        [HttpPost]
        public IActionResult AddFilme(Filme filme)
        {
            if (filme.Nota < 1 || filme.Nota > 5)
            {
                return BadRequest("Nota deve ser entre 1 e 5.");
            }

            _context.Filmes.Add(filme);
            _context.SaveChanges();
            return Created ("api/filmes/"+filme.Id, filme);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Filme filme)
        {
            var movie = _context.Filmes.SingleOrDefault(x => x.Id == id);
            if (movie == null)
            {
                return NotFound("Filme com id " + id + " não existe");
            }
            if (filme.Nota != 0 && (filme.Nota < 1 || filme.Nota > 5))
            {
                return BadRequest("Nota deve ser entre 1 e 5.");
            }

            if (!string.IsNullOrEmpty(filme.Nome))
            {
                movie.Nome = filme.Nome;
            }

            if (filme.Nota != 0)
            {
                movie.Nota = filme.Nota;
            }

            _context.Update(movie);
            _context.SaveChanges();
            return Ok("Filme com o Id " + id + " atualizado com sucesso!");
        }
    }
}
