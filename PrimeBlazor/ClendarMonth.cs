namespace PrimeBlazor
{
    public class ClendarMonth
    {
        public int month { get; set; }
        public int year { get; set; }
        public List<List<DateMeata>> dates { get; set; } = new List<List<DateMeata>>();
        public List<int> weekNumbers { get; set; } = new List<int>();
    }
}
