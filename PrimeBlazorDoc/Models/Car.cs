using System.Xml.Linq;

namespace PrimeBlazorDoc.Models
{
    public class Car
    {
        public string Vin { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Color { get; set; } = string.Empty;
        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType()) return false;
            Car other = (Car)obj;
            return Vin.Equals(other.Vin) && Brand.Equals(other.Brand) && Value.Equals(other.Value) && Year == other.Year && Color.Equals(other.Color);
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(Vin, Brand, Value, Year, Color);
        }
    }
}
