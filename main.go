package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/jspc/wg-sock-stats/stats"
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

	http.HandleFunc("/stats", func(w http.ResponseWriter, r *http.Request) {
		d, err := client.Get(context.Background(), new(stats.Statistics))
		if err != nil {
			w.WriteHeader(http.StatusBadGateway)
			fmt.Fprint(w, err)

			return
		}
		body, _ := protojson.Marshal(d)
		fmt.Fprint(w, string(body))
	})

	panic(http.ListenAndServe(":8080", nil))
}
