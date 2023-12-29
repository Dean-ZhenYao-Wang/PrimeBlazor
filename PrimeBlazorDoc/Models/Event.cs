namespace PrimeBlazorDoc.Models
{
    public class Event
    {
        public int id { get; set; }
        public string? title { get; set; }
        public string? url { get; set; }
        public DateTime start { get; set; }
        public DateTime? end { get; set; }
    }
}
