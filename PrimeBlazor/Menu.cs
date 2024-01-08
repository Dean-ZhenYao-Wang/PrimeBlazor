using Microsoft.AspNetCore.Components.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class Menu
    {
        public string? url { get; set; }
        public string label { get; set; } = string.Empty;
        public string? icon { get; set; }
        public Action<SplitButtonCommandEventArgs>? command { get; set; }
    }
}
