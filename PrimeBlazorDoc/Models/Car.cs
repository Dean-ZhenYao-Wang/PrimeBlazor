using System.Xml.Linq;

namespace PrimeBlazorDoc.Models
{
    public class Car
    {
        public string Brand { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType()) return false;
            Car other = (Car)obj;
            return Brand.Equals(other.Brand) && Value.Equals(other.Value);
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(Brand, Value);
        }
    }
}
