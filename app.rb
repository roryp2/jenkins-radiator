require 'sinatra/base'
require 'net/http'

module JenkinsRadiator

  class App < Sinatra::Base
    set :root, File.dirname(__FILE__)
    set :views, Proc.new { File.join root, 'views' }
    set :public_folder, Proc.new { File.join root, 'public' }

    get '/' do
      File.read File.join('public/views', 'index.html')
    end

    get '/jenkins' do
      callback = params['jsonp']
      uri = URI(URI::encode(params['server']))

      content_type 'application/javascript'
      "#{callback}(#{Net::HTTP.get(uri)});"
    end
  end
end