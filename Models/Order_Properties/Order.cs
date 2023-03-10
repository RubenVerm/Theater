using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
    [Key]
    public int OrderId { get; set; }

    public DateTime OrderDate { get; set; }

    [Required]
    public string? CustomerId { get; set; }

    public string ShowName { get; set; }

    public virtual ApplicationUser Customer { get; set; }

    //Tickets die de order bevatten

    public ICollection<Ticket> Tickets { get; set; }

}
