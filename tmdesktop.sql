-- phpMyAdmin SQL Dump
-- version 3.3.7deb3
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: Fev 10, 2011 as 07:50 AM
-- Versão do Servidor: 5.0.51
-- Versão do PHP: 5.3.3-7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `tmdesktop`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `icons`
--

CREATE TABLE IF NOT EXISTS `icons` (
  `id` int(10) unsigned zerofill NOT NULL auto_increment,
  `URL` varchar(254) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `window_id` varchar(45) NOT NULL,
  `largura` int(11) NOT NULL default '800',
  `altura` int(11) NOT NULL default '600',
  `Label` varchar(100) NOT NULL,
  `largura_icon` varchar(45) NOT NULL default '64',
  `altura_icon` varchar(45) NOT NULL default '64',
  `nivel_user` int(11) NOT NULL,
  `icon` varchar(45) NOT NULL,
  `ord` int(11) default NULL,
  `ativo` int(11) default '1',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `icons`
--

INSERT INTO `icons` (`id`, `URL`, `titulo`, `window_id`, `largura`, `altura`, `Label`, `largura_icon`, `altura_icon`, `nivel_user`, `icon`, `ord`, `ativo`) VALUES
(0000000009, 'http://www.terra.com.br', 'Google', 'google', 800, 600, 'Google', '48', '48', 10, 'google.png', 50, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `userId` int(10) unsigned zerofill NOT NULL auto_increment,
  `nome` varchar(45) character set latin1 NOT NULL,
  `email` varchar(45) character set latin1 NOT NULL,
  `senha` varchar(45) character set latin1 NOT NULL,
  `nivel` varchar(45) character set latin1 NOT NULL default '1',
  PRIMARY KEY  (`userId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`userId`, `nome`, `email`, `senha`, `nivel`) VALUES
(0000000008, 'Paulo Moreira', 'neophitus@gmail.com', 'm0r31r4', '100'),
(0000000009, 'demo', 'demo', 'demo', '0'),
(0000000010, 'gerente', 'gerente', 'gerente', '30'),
(0000000011, 'administrador', 'administrador', 'administrador', '60');
