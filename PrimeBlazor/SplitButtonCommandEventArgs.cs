using Microsoft.AspNetCore.Components.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class CommandEventArgs
    {
        public MouseEventArgs EventArgs { get; set; }
        public Menu Menu { get; set; }
    }
}
