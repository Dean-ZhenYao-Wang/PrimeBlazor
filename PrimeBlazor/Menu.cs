using Microsoft.AspNetCore.Components.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public partial class Menu
    {
        public string? url { get; set; }
        public string label { get; set; } = string.Empty;
        public List<Menu> items { get; set; }=new List<Menu>();
        public string? icon { get; set; }
        public string? CssClass { get; set; } = null;
        public string? style { get; set; } = null;
        public string? target { get; set; } = null;
        public Action<CommandEventArgs>? command { get; set; }
    }
}
