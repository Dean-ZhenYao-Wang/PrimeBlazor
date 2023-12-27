namespace PrimeBlazorDoc.Models
{
    public class City
    {
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType()) return false;
            City other = (City)obj;
            return Name.Equals(other.Name) && Code.Equals(other.Code);
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(Name, Code);
        }
    }
}
