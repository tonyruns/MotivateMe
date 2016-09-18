# require "mp3info"


class MusicController < ApplicationController

  def index
    files = Dir.glob("public/SoundClips/*")

    link = files[rand(files.length)];

    Mp3Info.open(link) do |mp3info|
      @text = mp3info.tag['title']
    end

    @link = "/"+link.split("/", 2)[1]
  end
end
