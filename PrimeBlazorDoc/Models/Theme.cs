namespace PrimeBlazorDoc.Models
{
    public class Theme
    {
        public string Brand { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public override bool Equals(object? obj)
        {
            if(obj==null||GetType() != obj.GetType()) return false;
            Theme other=(Theme)obj;
            return Brand.Equals(other.Brand) && Key.Equals(other.Key);
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(Brand, Key);
        }
    }
}
