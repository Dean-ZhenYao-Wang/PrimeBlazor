using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class BodyEventListener : IAsyncDisposable
    {
        private readonly IJSRuntime _jsRuntime;
        private readonly DotNetObjectReference<BodyEventListener> _dotNetRef;
        private bool _disposed = false;
        private Action<MouseEventArgs> eventCallback;

        public BodyEventListener(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
            _dotNetRef = DotNetObjectReference.Create(this);
        }

        public async Task Register(string eventName, Action<MouseEventArgs> eventCallback)
        {
            this.eventCallback = eventCallback;
            await _jsRuntime.InvokeVoidAsync("bodyEventListener.register", eventName, _dotNetRef);
        }

        [JSInvokable]
        public void InvokeCallback(MouseEventArgs args)
        {
            eventCallback(args);
        }

        public async ValueTask DisposeAsync()
        {
            if (!_disposed)
            {
                _disposed = true;
                await _jsRuntime.InvokeVoidAsync("bodyEventListener.unregister", _dotNetRef);
                _dotNetRef.Dispose();
            }
        }
    }
}
