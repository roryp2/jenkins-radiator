#\ -s puma
require 'rack/handler/puma'

$LOAD_PATH.unshift(File.dirname(__FILE__))
$:.push(File.dirname(__FILE__))

require 'app'
port = 9292
Rack::Handler::Puma.run JenkinsRadiator::App.new, {:Threads => '30:300', :Port => port}