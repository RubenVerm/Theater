using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Ticket
{
    [Key]
    public int TicketId { get; set; }

    private string Ticketcode { get; set; } = Guid.NewGuid().ToString().Substring(0, 4);

    public decimal Price { get; set; }

    public string classSeats { get; set; }

    [Required]
    public string CustomerId { get; set; }

    public int? HallId { get; set; }

    public int? RoomId { get; set; }

    [Required]
    public int ShowId { get; set; }

    [Required]
    public int OrderId { get; set; }

    public virtual ApplicationUser Customer { get; set; }
    public virtual Hall? Hall { get; set; }
    public virtual Room? Room { get; set; }
    public virtual Show Show { get; set; }
    public virtual Order Order { get; set; }

}
