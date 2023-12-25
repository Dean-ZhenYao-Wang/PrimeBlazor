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
        public static IServiceCollection AddPrimeBlazor(this IServiceCollection services)
        {
            ArgumentNullException.ThrowIfNull(services, nameof(services));
            //services.AddSingleton<ObjectUtilsJsInterop>();
            return services;
        }
    }
}
