namespace PrimeBlazor
{
    public class DateLocale
    {
        public int firstDayOfWeek { get; set; } = 0;
        public List<string> dayNames { get; set; } = new List<string>() { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
        public List<string> dayNamesShort { get; set; } = new List<string>() { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };
        public List<string> dayNamesMin { get; set; } = new List<string>() { "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" };
        public List<string> monthNames { get; set; } = new List<string>() { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
        public List<string> monthNamesShort { get; set; } = new List<string>() { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
        public string today { get; set; } = "Today";
        public string clear { get; set; } = "Clear";
        public string dateFormat { get; set; } = "mm/dd/yy";
        public string weekHeader { get; set; } = "Wk";
    }
}
