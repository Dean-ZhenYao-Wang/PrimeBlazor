using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public static class PrimeBlazorServiceCollectionExtensions
    {
        public static IServiceCollection AddPrimeBalzor(this IServiceCollection services)
        {
            ArgumentNullException.ThrowIfNull(services, "services");
            //services.AddSingleton<ObjectUtilsJsInterop>();
            return services;
        }
    }
}
