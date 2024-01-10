namespace PrimeBlazorDoc.Models
{
    public class iconJson
    {
        public string IcoMoonType { get; set; }
        public List<icons> icons { get; set; }
        public int height { get; set; }
        public icon_metadata metadata { get; set; }
    }
    public class icon_metadata
    {
        public string name { get; set; }
        public string url { get; set; }
        public string designer { get; set; }
        public string license { get; set; }
        public string licenseURL { get; set; }
    }
    public class icons
    {
        public icon icon { get; set; }
        public List<object> attrs { get; set; }
        public property properties { get; set; }
        public int setIdx { get; set; }
        public int setId { get; set; }
        public int iconIdx { get; set; }
    }
    public class icon
    {
        public List<string> paths { get; set; }
        public List<object> attrs { get; set; }
        public bool isMulticolor { get; set; }
        public bool isMulticolor2 { get; set; }
        public int grid { get; set; }
        public List<string> tags { get; set; }
    }
    public class property
    {
        public int order { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public int prevSize { get; set; }
        public int code { get; set; }
    }
}
