# -*- encoding: utf-8 -*-
# stub: bitmask_attributes 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "bitmask_attributes".freeze
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Joel Moss".freeze]
  s.date = "2013-11-03"
  s.email = "joel@developwithstyle.com".freeze
  s.homepage = "http://github.com/joelmoss/bitmask_attributes".freeze
  s.rubygems_version = "2.6.2".freeze
  s.summary = "Simple bitmask attribute support for ActiveRecord".freeze

  s.installed_by_version = "2.6.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activerecord>.freeze, [">= 3.1"])
      s.add_development_dependency(%q<appraisal>.freeze, ["~> 0.5.1"])
    else
      s.add_dependency(%q<activerecord>.freeze, [">= 3.1"])
      s.add_dependency(%q<appraisal>.freeze, ["~> 0.5.1"])
    end
  else
    s.add_dependency(%q<activerecord>.freeze, [">= 3.1"])
    s.add_dependency(%q<appraisal>.freeze, ["~> 0.5.1"])
  end
end
