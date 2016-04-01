class Marvel

  class << self

    def initialize
      @client = Marvelite::API::Client.new(public_key: ENV['MARVEL_PUBLIC_KEY'], private_key: ENV['MARVEL_PRIVATE_KEY'])
    end

  end

end