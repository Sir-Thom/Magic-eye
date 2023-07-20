import http.server
import socketserver

PORT = 8000  # You can change the port number if needed

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Server running at http://localhost:{}/server".format(PORT))
    httpd.serve_forever()
