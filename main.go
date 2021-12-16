package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/jspc/wg-sock-stats/stats"
	"github.com/rs/cors"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
)

var (
	statsAddress = os.Getenv("STATS_ADDRESS")
)

func main() {
	conn, err := grpc.Dial(statsAddress, grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	client := stats.NewStatsClient(conn)

	mux := http.NewServeMux()
	mux.HandleFunc("/stats", func(w http.ResponseWriter, r *http.Request) {
		d, err := client.Get(context.Background(), new(stats.Statistics))
		if err != nil {
			w.WriteHeader(http.StatusBadGateway)
			fmt.Fprint(w, err)

			return
		}
		body, _ := protojson.Marshal(d)
		fmt.Fprint(w, string(body))
	})

	// catchall media
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join("ui/build", r.URL.Path))
	})

	handler := cors.Default().Handler(mux)

	panic(http.ListenAndServe(":8080", handler))
}
