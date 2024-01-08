using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public partial class Message
    {
        [Parameter]
        public string id { get; set; } = Guid.NewGuid().ToString();
        [Parameter]
        public string summary { get; set; }
        [Parameter]
        public string detail { get; set; }
        [Parameter]
        public string group { get; set; }
        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType()) return false;
            Message other = (Message)obj;
            return id.Equals(other.id);
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(id);
        }
    }
}
