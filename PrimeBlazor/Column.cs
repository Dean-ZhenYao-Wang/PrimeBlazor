using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class Column
    {
        [Parameter] public object? columnKey { get; set; } = null;
        [Parameter] public string? field { get; set; } = null;
        [Parameter] public string? sortField { get; set; } = null;
        [Parameter] public bool sortable { get; set; } = false;
        [Parameter] public string? header { get; set; } = null;
        [Parameter] public string? footer { get; set; } = null;
    }
}
