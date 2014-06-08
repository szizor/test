root = "/home/deploy/apps/imjuve/current"
working_directory root
pid "#{root}/tmp/pids/unicorn.pid"
stderr_path "#{root}/log/unicornstd_err.log"
stdout_path "#{root}/log/unicornstd_out.log"

listen "/tmp/unicorn.imjuve.sock"
worker_processes 2
timeout 30